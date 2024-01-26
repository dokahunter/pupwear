import { Col, Container, Row } from "react-bootstrap";
import "../Footer/footer.scss"
import MailTo from "../MailTo/Mailto";

export default function Footer() {
    return (
        <div className="footer">
            <Container>
                <Row>
                    <Col> 
                    <p className="fw-bold">Kövess minket</p>
                        <ul>
                            <li><a className="link" href="#">Facebook</a></li>
                            <li><a className="link" href="#">Instagram</a></li>
                            <li><a className="link" href="#">TikTok</a></li>
                            <li><a className="link" href="#">Pinterest</a></li>
                            <li><a className="link" href="#">Twitter</a></li>
                        </ul>
                    </Col>
                    <Col>
                    <p className="fw-bold">Fontos információk</p> 
                        <ul>
                            <li><a className="link" href="#">ÁSZF</a></li>
                            <li><a className="link" href="#">GYIK</a></li>
                            <li><a className="link" href="#">Impresszum</a></li>
                        </ul>
                    </Col>
                    <Col>
                    <p className="fw-bold">Elérhetőségek</p>
                        <ul>
                            <li><span className="fw-bold">Cím:</span> Ábrahámhegy, Sziget u. 20.</li>
                            <li><span className="fw-bold">E-mail:</span> <MailTo label="woof@pupwear.hu" mailto="mailto:woof@pupwear.hu" /></li>
                            <li><span className="fw-bold">Telefon:</span> +36-80/9663-828</li>
                        </ul>
                    </Col>
                    <Col className="d-none d-lg-block">
                        <iframe 
                            src={"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2794.6917622687142!2d17.56629551709081!3d46.810388700000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4769a99a35870f29%3A0x7aac754afbb6b052!2zw4FicmFow6FtaGVneSwgU3ppZ2V0IHUuIDIwLCA4MjU2!5e1!3m2!1shu!2shu!4v1684680730766!5m2!1shu!2shu"} 
                            className="fluid"
                            height={"auto"} 
                            allowFullScreen={""} 
                            loading={"lazy" }
                            referrerPolicy={"no-referrer-when-downgrade"} >
                        </iframe>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}