import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.post('https://your-backend-on-railway.app/api/admin/login', {
                email,
                password
            });

            if (response.data.success) {
                // Token save karna zaroori hai takay dashboard pata rakh sakay aap logged in hain
                localStorage.setItem('adminToken', response.data.token);
                
                // Dashboard ke raste par ravana ho jayen!
                navigate('/admin/dashboard');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.wrapper}>
            <div style={styles.card}>
                <div style={styles.header}>
                    <h1 style={styles.title}>Admin Portal</h1>
                    <p style={styles.subtitle}>Enter your credentials to access the dashboard</p>
                </div>

                <form onSubmit={handleSubmit}>
                    {error && <div style={styles.errorBox}>{error}</div>}

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Email Address</label>
                        <input 
                            type="email" 
                            style={styles.input} 
                            placeholder="admin@realestate.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Password</label>
                        <input 
                            type="password" 
                            style={styles.input} 
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                        />
                    </div>

                    <button 
                        type="submit" 
                        style={loading ? {...styles.button, opacity: 0.7} : styles.button}
                        disabled={loading}
                    >
                        {loading ? 'Authenticating...' : 'Login to Dashboard'}
                    </button>
                </form>
            </div>
        </div>
    );
};

const styles = {
    wrapper: { height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f2f5', fontFamily: 'Arial, sans-serif' },
    card: { backgroundColor: '#fff', padding: '40px', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' },
    header: { textAlign: 'center', marginBottom: '30px' },
    title: { margin: '0', color: '#1a202c', fontSize: '24px', fontWeight: 'bold' },
    subtitle: { color: '#718096', fontSize: '14px', marginTop: '8px' },
    inputGroup: { marginBottom: '20px' },
    label: { display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#4a5568' },
    input: { width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #e2e8f0', boxSizing: 'border-box', fontSize: '16px' },
    button: { width: '100%', padding: '12px', backgroundColor: '#2b6cb0', color: 'white', border: 'none', borderRadius: '6px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', transition: '0.3s' },
    errorBox: { backgroundColor: '#fff5f5', color: '#c53030', padding: '10px', borderRadius: '6px', marginBottom: '20px', fontSize: '14px', textAlign: 'center', border: '1px solid #feb2b2' }
};

export default LoginPage;