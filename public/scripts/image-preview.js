const imageInputElement = document.querySelector("#image-upload-control input");
const imagePreviewElement = document.querySelector("#image-upload-control img");

function updateImagePreview() {
  const files = imageInputElement.files;

  if (!files || files.length === 0) {
    imagePreviewElement.computedStyleMap.display = "none";
    return;
  }

  const pickedFile = files[0];

  imagePreviewElement.src = URL.createObjectURL(pickedFile); // generate a URL that works on the cpu of the visitor who picked file
  imagePreviewElement.style.display = "block";
}

imageInputElement.addEventListener("change", updateImagePreview);
