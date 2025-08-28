import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { formatSize } from '../lib/utils'

interface FileUploaderProps {
  onFileSelect?: (file: File | null) => void;
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0] || null;
    onFileSelect?.(file);
  }, [onFileSelect]);

  const maxFileSize = 20 * 1024 * 1024; // 20MB

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    onDrop,
    multiple: false,
    accept: { 'application/pdf': ['.pdf'] },
    maxSize: maxFileSize,
  });

  const file = acceptedFiles[0] || null;

  const getDropzoneStyles = () => {
    const baseStyles = {
      width: '100%',
      border: '2px dashed',
      borderRadius: '16px',
      padding: '24px',
      cursor: 'pointer',
      transition: 'all 0.3s ease-in-out',
      outline: 'none'
    };

    if (isDragActive) {
      return {
        ...baseStyles,
        borderColor: '#6366f1', // indigo-500
        backgroundColor: '#eef2ff' // indigo-50
      };
    } else {
      return {
        ...baseStyles,
        borderColor: '#d1d5db', // gray-300
        backgroundColor: 'transparent'
      };
    }
  };

  return (
    <div
      {...getRootProps()}
      style={getDropzoneStyles()}
      onMouseEnter={(e) => {
        if (!isDragActive) {
          e.currentTarget.style.borderColor = '#818cf8'; // indigo-400
          e.currentTarget.style.backgroundColor = '#f9fafb'; // gray-50
        }
      }}
      onMouseLeave={(e) => {
        if (!isDragActive) {
          e.currentTarget.style.borderColor = '#d1d5db'; // gray-300
          e.currentTarget.style.backgroundColor = 'transparent';
        }
      }}
    >
      <input {...getInputProps()} />

      {/* File selected */}
      {file ? (
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '16px',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
            border: '1px solid #e5e7eb'
          }}
        >
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}
          >
            <img 
              src="/images/pdf.png" 
              alt="pdf" 
              style={{
                width: '40px',
                height: '40px'
              }}
            />
            <div 
              style={{
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <p 
                style={{
                  fontSize: '16px',
                  fontWeight: '500',
                  color: '#1f2937',
                  margin: 0,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  maxWidth: '300px'
                }}
              >
                {file.name}
              </p>
              <p 
                style={{
                  fontSize: '14px',
                  color: '#6b7280',
                  margin: 0
                }}
              >
                {formatSize(file.size)}
              </p>
            </div>
          </div>
          <button
            style={{
              padding: '8px',
              borderRadius: '50%',
              border: 'none',
              backgroundColor: 'transparent',
              cursor: 'pointer',
              transition: 'all 0.2s ease-in-out',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#fecaca'; // red-100
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
            onClick={(e) => {
              e.stopPropagation();
              onFileSelect?.(null);
            }}
          >
            <img 
              src="/icons/cross.svg" 
              alt="remove" 
              style={{
                width: '16px',
                height: '16px'
              }}
            />
          </button>
        </div>
      ) : (
        /* Empty state */
        <div 
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center'
          }}
        >
          <div 
            style={{
              width: '64px',
              height: '64px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              backgroundColor: '#eef2ff', // indigo-50
              marginBottom: '16px'
            }}
          >
            <img 
              src="/icons/info.svg" 
              alt="upload" 
              style={{
                width: '40px',
                height: '40px'
              }}
            />
          </div>
          <p 
            style={{
              fontSize: '18px',
              color: '#374151',
              margin: '8px 0'
            }}
          >
            <span 
              style={{
                fontWeight: '600',
                color: '#4f46e5' // indigo-600
              }}
            >
              Click to upload
            </span> or drag and drop
          </p>
          <p 
            style={{
              fontSize: '14px',
              color: '#6b7280',
              margin: 0
            }}
          >
            PDF (max {formatSize(maxFileSize)})
          </p>
        </div>
      )}
    </div>
  );
};

export default FileUploader;