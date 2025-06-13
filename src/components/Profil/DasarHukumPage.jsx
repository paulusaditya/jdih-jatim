import { useEffect, useState } from 'react';
import axios from 'axios';
import baseUrl from '../../config/api';

const DasarHukumPage = () => {
  const [htmlContent, setHtmlContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${baseUrl}/topics/by-slug/dasar-hukum`)
      .then((res) => {
        const { data } = res.data;
        setHtmlContent(data?.details_id || '<p>Konten tidak tersedia.</p>');
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Gagal memuat data.');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Memuat...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: htmlContent }} />
  );
};

export default DasarHukumPage;
