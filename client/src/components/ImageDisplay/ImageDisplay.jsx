import { Card, CardMedia } from '@mui/material';

const ImageDisplay = ({ imagePath, width, height }) => {
  const cardStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: height,
    borderRadius: '50%',
    overflow: 'hidden',
  };

  const mediaStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  };

  return (
    <Card style={cardStyle}>
      <CardMedia component="img" image={imagePath} style={mediaStyle} />
    </Card>
  );
};

export default ImageDisplay;
