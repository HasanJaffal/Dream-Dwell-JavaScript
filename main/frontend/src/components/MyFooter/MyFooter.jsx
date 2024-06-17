import './MyFooter.css';
// Example import in your component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';

const MyFooter = () => {
    return (
        <footer className="footer bg-blue-500">
            <div className="footer-content">
                <p>&copy; 2023 Dream Dwell. All rights reserved.</p>
                <div className="social-icons">
                    <a href="#" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faFacebook} />
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faTwitter} />
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faLinkedin} />
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faInstagram} />
                    </a>
                </div>
            </div>
        </footer>

    );
};

export default MyFooter;