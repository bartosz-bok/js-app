import jsPDF from 'jspdf';

const getImageDimensions = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve({ width: img.width, height: img.height });
    img.onerror = (error) => reject(error);
    img.src = url;
  });
};

export const DownloadPDFButton = ({ data }) => {
  const handleDownloadPDF = async () => {
    // Create a new jsPDF instance
    const pdf = new jsPDF();

    // Set properties for the PDF
    pdf.setProperties({
      title: 'Wojny',
      subject: 'Wojny',
      author: 'Bartosz Bok',
    });

    // Add content to the PDF
    // pdf.text('Event Details', 20, 10);

    // Iterate through the data and add it to the PDF
    for (let index = 0; index < data.length; index++) {
      const event = data[index];
      if (index > 0) {
        pdf.addPage(); // Add a new page for each event (except the first one)
      }

      const yPos = 20 + index * 60; // Adjust spacing for image
      const maxWidth = pdf.internal.pageSize.getWidth() - 40; // Maximum width for text

      pdf.text(`${event.eventName}`, 20, yPos + 10, { maxWidth });
      pdf.text(`${event.startDate} - ${event.endDate}`, 20, yPos + 20, { maxWidth });
      pdf.text(`${event.description}`, 20, yPos + 40, { maxWidth });

      // Add image from imageUrl
      // if (event.imageUrl) {
      //   pdf.addImage(event.imageUrl, 'JPEG', 15, yPos + 50, 40, 40); // Adjust image size and position
      // }

      if (event.imageUrl) {
        try {
          const { width, height } = await getImageDimensions(event.imageUrl);
          const aspectRatio = width / height;
          const imgWidth = 80; // Adjust image size
          const imgHeight = imgWidth / aspectRatio;
          pdf.addImageFromUrl(event.imageUrl, 15, yPos + 70, imgWidth, imgHeight);
        } catch (error) {
          console.error('Error loading image:', error);
        }
      }

      // Add more fields as needed
    }

    // Save the PDF
    pdf.save('spis.pdf');
  };

  return (
    <button style={{ position: 'absolute', zIndex: '999' }} onClick={handleDownloadPDF}>
      Download PDF
    </button>
  );
};
