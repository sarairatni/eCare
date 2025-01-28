import time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains

# Set the correct path to your ChromeDriver executable
chrome_driver_path = r'C:\Users\Azur Laptop\Downloads\chromedriver-win64\chromedriver-win64\chromedriver.exe'

# Use the Service object
service = Service(chrome_driver_path)

# Configure Chrome options
chrome_options = webdriver.ChromeOptions()
chrome_options.add_argument('--start-maximized')  # Start browser maximized

# Pass the service object and options to the WebDriver
driver = webdriver.Chrome(service=service, options=chrome_options)
wait = WebDriverWait(driver, 10)

try:
    # Attempt to open the page
    driver.get("http://localhost:4200/doctor/creation-dpi")
    time.sleep(2)  # Wait for page to fully load

    # Print the page title
    print("Page title:", driver.title)
    
    # Find all input fields on the page
    input_fields = driver.find_elements(By.TAG_NAME, 'input')

    # all input field values
    for field in input_fields:
        field_name = field.get_attribute('formControlName')
        field_value = field.get_attribute('value')
        print(f"Field Name: {field_name}, Value: {field_value}")
    
    # User account information
    username_input = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "[formControlName='username']")))
    password_input = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "[formControlName='password']")))
    email_input = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "[formControlName='email']")))
    
    # Patient information
    nss_input = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "[formControlName='nss']")))
    nom_input = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "[formControlName='nom']")))
    prenom_input = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "[formControlName='prenom']")))
    adresse_input = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "[formControlName='adresse']")))
    date_naissance_input = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "[formControlName='date_naissance']")))
    num_tel_input = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "[formControlName='num_tel']")))
    med_traitant_select = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "[formControlName='med_traitant']")))
    contact_input = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "[formControlName='contact']")))

    username_input.send_keys("testuser")
    password_input.send_keys("testpassword")
    email_input.send_keys("test@example.com")
    nss_input.send_keys("123456789")
    nom_input.send_keys("Doe")
    prenom_input.send_keys("John")
    adresse_input.send_keys("123 Test Street")
    date_naissance_input.send_keys("1990-01-01")
    num_tel_input.send_keys("0123456789")
    
    # Handle the select element for med_traitant
    select = Select(med_traitant_select)
    # Wait for options to be loaded
    wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "[formControlName='med_traitant'] option:not([value='']")))
    # Select the first doctor in the list 
    options = select.options
    if len(options) > 1: 
        select.select_by_index(1)
    
    contact_input.send_keys("0987654321")
    
    # Find the submit button and scroll it into view
    submit_button = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "button[type='submit']")))
    driver.execute_script("arguments[0].scrollIntoView(true);", submit_button)
    time.sleep(1) 
    
    driver.execute_script("arguments[0].click();", submit_button)

    time.sleep(2) 
    try:
        # First check for error message
        error_message = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "div.text-red-500")))
        print("Form submission failed with error:", error_message.text)
    except:
        # If no error message, check for success (form reset)
        if not nss_input.get_attribute('value'):
            print("Form submitted successfully! (Form was reset), dossier crée avec succes")
        else:
            print("Form submission status unclear")
    
    time.sleep(3)

except Exception as e:
    print(f"Error: {e}")

finally:
    driver.quit()