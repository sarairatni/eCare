import qrcode
from io import BytesIO
from django.core.files.uploadedfile import InMemoryUploadedFile

def generate_patient_qr_code(patient_data):
    # Create the QR code
    qr = qrcode.make(patient_data)
    
    # Save it in a BytesIO object
    img_io = BytesIO()
    qr.save(img_io, 'PNG')
    img_io.seek(0)
    
    # Return the file as an InMemoryUploadedFile (so it can be saved directly in the model)
    return InMemoryUploadedFile(img_io, None, 'patient_qr.png', 'image/png', img_io.getbuffer().nbytes, None)