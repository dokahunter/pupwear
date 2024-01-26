
        import Carousel from 'react-bootstrap/Carousel';
        import getProduct from "../../services/products-service"
import { Link } from 'react-router-dom';
        export default function HomePageCarousel() {
            const carouselData = 
            [
              {
                id: "-NUl4fw89F62ds-toQS1",
                name: "Piros csíkos kutyapóló",
                shortDesc: "Klasszikus csíkos minta soha nem megy ki a divatból - kutya és gazdája garantáltan felhívja magára a figyelmet",
                pic: "https://firebasestorage.googleapis.com/v0/b/csapat-10.appspot.com/o/images%2Fbig-dodzy-30vB4W1rnTQ-unsplash.jpg?alt=media&token=4ae532cc-40f7-44e6-a3e6-caf26af78cbf",
              },
              {
                id: "-NUl4fwFy2GfEf4AD9we",
                name: "Ocelot mintás egyberuha",
                shortDesc: "Ha szeretnéd, hogy a kutyád vad és elegáns legyen, akkor ez az ocelot mintás kutyaruhát neked találták ki",
                pic: "https://firebasestorage.googleapis.com/v0/b/csapat-10.appspot.com/o/images%2Fbruno-souza-pWB1_djX8lQ-unsplash.jpg?alt=media&token=f455fe94-e44e-431b-ba59-540fb1c84f49",
              },
              {
                id: "-NV5eZBhNZnORUKRNHlE",
                name: "Macskapóló Spongyabob mintával",
                pic: "https://firebasestorage.googleapis.com/v0/b/csapat-10.appspot.com/o/images%2Fd-ng-ph-c-h-i-tri-u-7vMO_PQnixQ-unsplash.jpg?alt=media&token=bb7626ca-1d7c-40cd-b79a-d9f51a90b7df",
                shortDesc: "Spongyabob rajongó vagy? Vagy a macskád az? Ez a pólónk tökéletes választás számodra"
              }
            ]
          return (
            <Carousel >
              <Carousel.Item interval={4200} >
                <img
                  className="d-block w-100"
                  src={carouselData[0].pic}
                  alt="First slide"
                />
                <Carousel.Caption className="bg-dark bg-opacity-50 p-3 rounded-3">
                  <h3> <Link to={`/termekek/${carouselData[0].id}`} className="link-opacity-25-hover link-light" > {carouselData[0].name} </Link>  </h3>
                  <p>{carouselData[0].shortDesc}</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item interval={2600}>
                <img
                  className="d-block w-100"
                  src={carouselData[1].pic}
                  alt="Second slide"
                />
                <Carousel.Caption className="bg-dark bg-opacity-50 p-3 rounded-3">
                  <h3> <Link to={`/termekek/${carouselData[1].id}`} className="link-opacity-25-hover link-light" > {carouselData[1].name} </Link>  </h3>
                  <p>{carouselData[1].shortDesc}</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item >
                <img
                  className="d-block w-100"
                  src={carouselData[2].pic}
                  alt="Third slide"
                />
                <Carousel.Caption className="bg-dark bg-opacity-50 p-3 rounded-3">
                    <h3> <Link to={`/termekek/${carouselData[2].id}`} className="link-opacity-25-hover link-light" > {carouselData[2].name} </Link>  </h3>
                    <p>{carouselData[2].shortDesc}</p>
                  </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            
          );
        }
        
 