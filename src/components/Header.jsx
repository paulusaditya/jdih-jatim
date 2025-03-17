export default function Header() {
    return (
      <>
        {/* Top Bar */}
        <div className="bg-blue-600 text-white text-sm py-2">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <ContactInfo icon="fas fa-phone-alt" text="031-3520881 031-3524001 (Psw. 1118)" />
              <ContactInfo icon="fas fa-envelope" text="support@jdih.jatimprov.go.id" />
            </div>
            <a className="bg-blue-800 px-2 py-1 rounded" href="mailto:majadigi.jatimprov.go.id">
              majadigi.jatimprov.go.id
            </a>
          </div>
        </div>
  
        {/* Header */}
        <div className="bg-white py-4">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Logo src="https://storage.googleapis.com/a1aa/image/RE7GcTKITnlepC3WZO5iSevky56tNDhdFRHcDTJjmjI.jpg" alt="Logo 1" />
              <Logo src="https://storage.googleapis.com/a1aa/image/eT2XbON-a3BQIrBpCMTMEp4zFJAs6kn3W75S-B-lED4.jpg" alt="Logo 2" />
              <Logo src="https://storage.googleapis.com/a1aa/image/OR5EvDkj2nY5QxdYDwKNeQx0jj9nToA6M-FMOeJeF5E.jpg" alt="Logo 3" />
              <div>
                <div className="text-sm">Jaringan Dokumentasi dan Informasi Hukum</div>
                <div className="text-2xl font-bold">PROVINSI JAWA TIMUR</div>
              </div>
            </div>
            <NavBar />
          </div>
        </div>
      </>
    );
  }
  
  function ContactInfo({ icon, text }) {
    return (
      <div className="flex items-center space-x-1">
        <i className={icon}></i>
        <span>{text}</span>
      </div>
    );
  }
  
  function Logo({ src, alt }) {
    return <img className="h-12" src={src} alt={alt} width={50} height={50} />;
  }
  
  function NavBar() {
    const navItems = ["Beranda", "Profil", "Produk Hukum", "Dokumentasi Hukum Lainnya", "Berita", "Survey"];
  
    return (
      <div className="flex space-x-10 text-blue-800">
        {navItems.map((item, index) => (
          <a key={index} className="hover:underline" href="#">
            {item}
          </a>
        ))}
      </div>
    );
  }
  