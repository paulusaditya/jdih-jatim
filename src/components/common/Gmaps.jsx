import React from 'react';

const Gmaps = () => {
  return (
    <div className="w-full h-[450px] rounded-xl overflow-hidden shadow-lg">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d554.3291089716766!2d112.73918343707378!3d-7.246035069147502!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7f940401c8755%3A0xe6b91ad0a085eaca!2sKantor%20Gubernur%20Jawa%20Timur!5e0!3m2!1sid!2sid!4v1744780813582!5m2!1sid!2sid"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Kantor Gubernur Jawa Timur"
      ></iframe>
    </div>
  );
};

export default Gmaps;
