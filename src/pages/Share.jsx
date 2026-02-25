import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, doc, setDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { Plus, X, Image as ImageIcon, Link as LinkIcon, ExternalLink, Edit3, Trash2, Check, Shield } from 'lucide-react';
import './Share.css';

const Share = () => {
    const [posts, setPosts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [teacherMode, setTeacherMode] = useState(false);
    const [userId, setUserId] = useState('');

    // Teacher Assignment State
    const [currentTask, setCurrentTask] = useState({
        title: "Nhiệm vụ tuần này",
        content: "Hãy chia sẻ một bức ảnh về Đà Nẵng mà em yêu thích nhất!"
    });

    // New/Edit Post State
    const [postForm, setPostForm] = useState({
        id: null, // If editing
        author: '',
        content: '',
        color: '#fff9c4',
        image: null,
        link: ''
    });

    const [attachmentType, setAttachmentType] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const colors = ['#fff9c4', '#e1bee7', '#b3e5fc', '#c8e6c9', '#ffccbc', '#f8bbd0', '#e6ee9c', '#ffe0b2'];

    // Initialize User ID
    useEffect(() => {
        let storedId = localStorage.getItem('share_user_id');
        if (!storedId) {
            storedId = 'user_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('share_user_id', storedId);
        }
        setUserId(storedId);
    }, []);

    // Fetch Data
    useEffect(() => {
        const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
        const unsubscribePosts = onSnapshot(q, (snapshot) => {
            const postsData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setPosts(postsData);
        });

        const taskDocRef = doc(db, "config", "share_page");
        const unsubscribeTask = onSnapshot(taskDocRef, (doc) => {
            if (doc.exists()) setCurrentTask(doc.data());
        });

        return () => { unsubscribePosts(); unsubscribeTask(); };
    }, []);

    // Handlers
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    const maxWidth = 800;
                    let width = img.width;
                    let height = img.height;

                    if (width > maxWidth) {
                        height = Math.round((height * maxWidth) / width);
                        width = maxWidth;
                    }
                    canvas.width = width;
                    canvas.height = height;
                    ctx.drawImage(img, 0, 0, width, height);
                    setPostForm(prev => ({ ...prev, image: canvas.toDataURL('image/jpeg', 0.7) }));
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmitPost = async (e) => {
        e.preventDefault();
        if (!postForm.author.trim() || !postForm.content.trim()) return;

        setIsSubmitting(true);
        try {
            if (postForm.id) {
                // Update existing post
                const postRef = doc(db, "posts", postForm.id);
                await updateDoc(postRef, {
                    author: postForm.author,
                    content: postForm.content,
                    color: postForm.color,
                    image: postForm.image,
                    link: postForm.link,
                    status: 'pending' // Re-verify on edit? Or keep approved? Let's reset to pending.
                });
                alert("Đã cập nhật bài viết! Vui lòng chờ giáo viên duyệt lại.");
            } else {
                // Create new post
                await addDoc(collection(db, "posts"), {
                    ...postForm,
                    userId: userId,
                    status: 'pending', // Pending by default
                    timestamp: serverTimestamp()
                });
                alert("Đã gửi bài! Vui lòng chờ giáo viên duyệt.");
            }
            closeModal();
        } catch (error) {
            console.error(error);
            alert("Lỗi: " + error.message);
        }
        setIsSubmitting(false);
    };

    const handleDeletePost = async (postId) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa bài này không?")) {
            try {
                await deleteDoc(doc(db, "posts", postId));
            } catch (error) {
                alert("Lỗi khi xóa: " + error.message);
            }
        }
    };

    const handleEditPost = (post) => {
        setPostForm(post);
        setAttachmentType(post.image ? 'image' : (post.link ? 'link' : null));
        setIsModalOpen(true);
    };

    const handleApprove = async (postId) => {
        try {
            await updateDoc(doc(db, "posts", postId), { status: 'approved' });
        } catch (error) {
            alert("Lỗi khi duyệt: " + error.message);
        }
    };

    const handleTeacherToggle = () => {
        if (!teacherMode) {
            const pass = prompt("Nhập mật khẩu giáo viên:");
            if (pass === "123456") setTeacherMode(true);
            else alert("Sai mật khẩu!");
        } else {
            setTeacherMode(false);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setPostForm({ id: null, author: '', content: '', color: '#fff9c4', image: null, link: '' });
        setAttachmentType(null);
    };

    // Filter posts based on mode and status
    const displayedPosts = posts.filter(post => {
        if (teacherMode) return true; // Teacher sees all
        if (post.userId === userId) return true; // Authors see their own posts (pending or approved)
        return post.status === 'approved'; // Others only see approved
    });

    return (
        <div className="share-page">
            <div className="share-header">
                <button className={`teacher-toggle-btn ${teacherMode ? 'active' : ''}`} onClick={handleTeacherToggle}>
                    <Shield size={14} /> {teacherMode ? 'Chế độ Giáo viên: BẬT' : 'Giáo viên'}
                </button>
                <h1 className="share-title">Góc Chia Sẻ 📝</h1>
                <p className="share-subtitle">Kết nối và chia sẻ yêu thương</p>
            </div>

            <div className="teacher-section">
                {teacherMode && (
                    <button className="edit-task-btn" onClick={() => setIsTaskModalOpen(true)}>
                        <Edit3 size={16} /> Giáo viên sửa
                    </button>
                )}
                <span className="teacher-label">📌 Nhiệm vụ từ giáo viên:</span>
                <p className="teacher-content">{currentTask.content}</p>
            </div>

            <div className="notes-grid">
                {displayedPosts.map(post => (
                    <div
                        key={post.id}
                        className={`note-card ${post.status === 'pending' ? 'pending' : ''}`}
                        style={{ backgroundColor: post.color }}
                    >
                        {post.status === 'pending' && <span className="pending-badge">Chờ duyệt...</span>}

                        {post.image && <img src={post.image} alt="Attachment" className="note-image" />}
                        <div className="note-content">{post.content}</div>
                        {post.link && (
                            <a href={post.link} target="_blank" rel="noopener noreferrer" className="note-link">
                                <ExternalLink size={14} style={{ verticalAlign: 'middle' }} /> {post.link}
                            </a>
                        )}

                        <div className="note-footer">
                            <span className="note-author">✍️ {post.author}</span>
                            <span className="note-date">{post.timestamp ? new Date(post.timestamp.seconds * 1000).toLocaleDateString('vi-VN') : ''}</span>
                        </div>

                        {/* Actions */}
                        <div className="note-actions">
                            {/* Teacher Actions */}
                            {teacherMode && post.status === 'pending' && (
                                <>
                                    <button className="action-btn approve" onClick={() => handleApprove(post.id)} title="Duyệt"><Check size={18} /></button>
                                    <button className="action-btn reject" onClick={() => handleDeletePost(post.id)} title="Từ chối"><X size={18} /></button>
                                </>
                            )}

                            {/* Owner Actions */}
                            {(post.userId === userId || teacherMode) && (
                                <>
                                    <button className="action-btn edit" onClick={() => handleEditPost(post)} title="Sửa"><Edit3 size={16} /></button>
                                    <button className="action-btn delete" onClick={() => handleDeletePost(post.id)} title="Xóa"><Trash2 size={16} /></button>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <button className="add-button" onClick={() => setIsModalOpen(true)}><Plus size={32} /></button>

            {/* Post Modal */}
            {isModalOpen && (
                <div className="modal-overlay" onClick={(e) => { if (e.target.className === 'modal-overlay') closeModal() }}>
                    <div className="modal-content">
                        <button className="close-btn" onClick={closeModal}><X size={24} /></button>
                        <h2 className="modal-title">{postForm.id ? "Chỉnh Sửa Bài" : "Viết Chia Sẻ Mới"}</h2>
                        <form onSubmit={handleSubmitPost}>
                            <div className="form-group">
                                <input type="text" className="form-input" placeholder="Tên bạn là gì?"
                                    value={postForm.author} onChange={(e) => setPostForm({ ...postForm, author: e.target.value })} required />
                            </div>
                            <div className="form-group">
                                <textarea className="form-textarea" placeholder="Nội dung..."
                                    value={postForm.content} onChange={(e) => setPostForm({ ...postForm, content: e.target.value })} required />
                            </div>

                            <div className="attachment-options">
                                <button type="button" className={`attach-btn ${attachmentType === 'image' ? 'active' : ''}`} onClick={() => setAttachmentType('image')}><ImageIcon size={18} /> Ảnh</button>
                                <button type="button" className={`attach-btn ${attachmentType === 'link' ? 'active' : ''}`} onClick={() => setAttachmentType('link')}><LinkIcon size={18} /> Link</button>
                            </div>

                            {attachmentType === 'image' && (
                                <div className="form-group">
                                    <input type="file" accept="image/*" onChange={handleImageChange} className="form-input" />
                                    {postForm.image && <div className="preview-area"><img src={postForm.image} alt="Preview" className="preview-image" /><button type="button" className="remove-attachment" onClick={() => setPostForm({ ...postForm, image: null })}><X size={14} /></button></div>}
                                </div>
                            )}
                            {attachmentType === 'link' && (
                                <div className="form-group"><input type="url" placeholder="https://..." value={postForm.link} onChange={(e) => setPostForm({ ...postForm, link: e.target.value })} className="form-input" /></div>
                            )}

                            <div className="color-picker">
                                {colors.map(c => <div key={c} className={`color-option ${postForm.color === c ? 'selected' : ''}`} style={{ backgroundColor: c }} onClick={() => setPostForm({ ...postForm, color: c })} />)}
                            </div>

                            <button type="submit" className="submit-btn" disabled={isSubmitting}>{isSubmitting ? 'Đang lưu...' : (postForm.id ? 'Cập Nhật' : 'Đăng Bài')}</button>
                        </form>
                    </div>
                </div>
            )}
            {/* Teacher Task Modal (Reuse existing logic) */}
            {isTaskModalOpen && (
                <div className="modal-overlay" onClick={() => setIsTaskModalOpen(false)}>
                    <div className="modal-content">
                        <button className="close-btn" onClick={() => setIsTaskModalOpen(false)}><X size={24} /></button>
                        <h2 className="modal-title">Cập Nhật Nhiệm Vụ</h2>
                        <form onSubmit={async (e) => {
                            e.preventDefault();
                            await setDoc(doc(db, "config", "share_page"), currentTask);
                            setIsTaskModalOpen(false);
                            alert("Đã cập nhật!"); // Simple alert
                        }}>
                            <div className="form-group">
                                <textarea className="form-textarea" value={currentTask.content} onChange={(e) => setCurrentTask({ ...currentTask, content: e.target.value })} required />
                            </div>
                            <button type="submit" className="submit-btn">Cập nhật</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Share;
