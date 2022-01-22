function Footer() {
    const date = new Date().getFullYear();
    return (
        <footer className="footer p-10 bg-gray-700 text-primary-content footer-center">
            <div className="">                
                <p>Copyright &copy; {date} All right reserved</p>
            </div>
        </footer>
    )
}

export default Footer;
