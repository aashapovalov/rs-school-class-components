import Slider from 'react-slick';

interface CarouselProps {
  images: { src: string; caption: string }[];
}

export default function Carousel({ images }: CarouselProps) {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div
      style={{
        width: '70%',
        display: 'block',
        margin: '0 auto',
      }}
    >
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <div
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <img
                src={image.src}
                alt={`Slide ${index}`}
                style={{
                  width: '80%',
                  height: 'auto',
                  borderRadius: '8px',
                }}
              />
              <p
                style={{
                  marginTop: '0.5rem',
                  fontSize: '0.9rem',
                  color: '#555',
                  textAlign: 'center',
                }}
              >
                {image.caption}
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
