"use client";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <p>
          © {currentYear} 影视星河 版权所有
        </p>
        <p>
          ICP备案号: 
          <a href="http://beian.miit.gov.cn" target="_blank" rel="noopener noreferrer">
            鲁ICP备12345678号-9
          </a>
        </p>
        {/* 如果有公安备案，可以添加如下行 */}
        {/* <p>
          <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=1234567890123456"
             target="_blank" rel="noopener noreferrer">
            <img src="/path/to/police/beian.png" alt="公安备案图标"/>
            粤公网安备 1234567890123456号
          </a>
        </p> */}
      </div>
      <style jsx>{`
        .footer {
          background-color: #f8f9fa;
          padding: 1rem 0;
          text-align: center;
          color: #6c757d;
        }
        .container {
          margin: 0 auto;
          max-width: 1200px;
        }
        .footer a {
          color: #007bff;
          text-decoration: none;
        }
        .footer a:hover {
          text-decoration: underline;
        }
      `}</style>
    </footer>
  );
};

export default Footer;