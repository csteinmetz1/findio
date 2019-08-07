var compress = function compress(e) {
  return new Promise(function (resolve, reject) {
    const width = 64;
    const height = 64;
    const fileName = e.target.files[0].name;
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = event => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const elem = document.getElementById('cover');
        elem.width = width;
        elem.height = height;
        const ctx = elem.getContext('2d');
        // img.width and img.height will contain the original dimensions
        ctx.drawImage(img, 0, 0, width, height);
        resolve(ctx.canvas);
        ctx.canvas.toBlob((blob) => {
          const file = new File([blob], fileName, {
              type: 'image/jpeg',
              lastModified: Date.now()
            });
            resolve(file)
        }, 'image/jpeg', 1);
      },
      reader.onerror = error => reject(error);
    };
  });
}