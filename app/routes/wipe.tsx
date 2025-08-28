import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

const WipeApp = () => {
    const { auth, isLoading, error, clearError, fs, ai, kv } = usePuterStore();
    const navigate = useNavigate();
    const [files, setFiles] = useState<FSItem[]>([]);

    const loadFiles = async () => {
        const files = (await fs.readDir("./")) as FSItem[];
        setFiles(files);
    };

    useEffect(() => {
        loadFiles();
    }, []);

    useEffect(() => {
        if (!isLoading && !auth.isAuthenticated) {
            navigate("/auth?next=/wipe");
        }
    }, [isLoading]);

    const handleDelete = async () => {
        for (const file of files) {
            await fs.delete(file.path);
        }
        await kv.flush();
        loadFiles();
    };

    if (isLoading) {
        return <div style={styles.loading}>Loading...</div>;
    }

    if (error) {
        return <div style={styles.error}>Error: {error}</div>;
    }

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Authenticated as: <span style={styles.username}>{auth.user?.username}</span></h2>

            <h3 style={styles.subtitle}>Existing Files:</h3>
            <div style={styles.fileList}>
                {files.length === 0 ? (
                    <p style={styles.noFiles}>No files found</p>
                ) : (
                    files.map((file) => (
                        <div key={file.id} style={styles.fileItem}>
                            <p style={styles.fileName}>{file.name}</p>
                        </div>
                    ))
                )}
            </div>

            <button style={styles.button} onClick={handleDelete}>
                Wipe App Data
            </button>
        </div>
    );
};

export default WipeApp;

// ---------- Inline Styles ----------
const styles: { [key: string]: React.CSSProperties } = {
    container: {
        maxWidth: "600px",
        margin: "40px auto",
        padding: "20px",
        backgroundColor: "#f9f9f9",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        fontFamily: "Arial, sans-serif",
    },
    title: {
        fontSize: "20px",
        fontWeight: "bold",
        marginBottom: "15px",
        color: "#333",
    },
    username: {
        color: "#007BFF",
    },
    subtitle: {
        fontSize: "16px",
        fontWeight: "500",
        marginBottom: "10px",
        color: "#444",
    },
    fileList: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        marginBottom: "20px",
    },
    fileItem: {
        padding: "10px 15px",
        borderRadius: "8px",
        backgroundColor: "#fff",
        border: "1px solid #ddd",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
    fileName: {
        margin: 0,
        color: "#555",
        fontSize: "14px",
    },
    noFiles: {
        fontSize: "14px",
        color: "#888",
        fontStyle: "italic",
    },
    button: {
        backgroundColor: "#007BFF",
        color: "#fff",
        padding: "10px 20px",
        border: "none",
        borderRadius: "8px",
        fontSize: "14px",
        fontWeight: "bold",
        cursor: "pointer",
        transition: "all 0.3s ease",
    },
    loading: {
        textAlign: "center",
        marginTop: "50px",
        fontSize: "18px",
        fontWeight: "500",
        color: "#555",
    },
    error: {
        color: "#d9534f",
        fontWeight: "bold",
        padding: "10px",
        backgroundColor: "#fcebea",
        borderRadius: "8px",
        textAlign: "center",
    },
};
