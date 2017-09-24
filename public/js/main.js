// Initializes SubmitForm.
function SubmitForm() {
  
    // Shortcuts to DOM Elements.
    this.contactForm = document.getElementById('contactForm');
    this.email = document.getElementById('email');
    this.message = document.getElementById('message');
    this.name = document.getElementById('name');
    this.submitButton = document.getElementById('submitButton');
  
    // Saves info on form submit.
    this.contactForm.addEventListener('submit', this.saveContact.bind(this));
 
    this.initFirebase();
  }
  
  
    /* TODO: SENDS EMAILS
  SubmitForm.prototype.sendEmail = function() {
    // Reference to the /messages/ database path.
    this.messagesRef = this.database.ref('messages');
    // Make sure we remove all previous listeners.
    this.messagesRef.off();
  
    // Loads the last 12 messages and listen for new ones.
    var setMessage = function(data) {
      var val = data.val();
      this.displayMessage(data.key, val.name, val.text, val.photoUrl, val.imageUrl);
    }.bind(this);
    this.messagesRef.limitToLast(12).on('child_added', setMessage);
    this.messagesRef.limitToLast(12).on('child_changed', setMessage);
  };
  */ //end TODO

  // Saves new contact info in the Firebase DB.
  SubmitForm.prototype.saveContact = function(e) {
    e.preventDefault();
    // Check that the user entered a message and is signed in.
    if (this.name.value && this.email.value) {
      this.database.ref("ContactInfo/").push({
        name: this.name.value,
        email: this.email.value,
        message: this.message.value
      }).then(function() { //change this!!
          alert("thank you for submitting your info")
          this.name.value=""
          this.email.value=""
          this.message.value=""
        // load the form again with no info
      }.bind(this)).catch(function(error) {
        console.error('Error writing new message to Firebase Database', error);
      });
    }
  };
  
  
  // Checks that the Firebase SDK has been correctly setup and configured.
  SubmitForm.prototype.checkSetup = function() {
    if (!window.firebase || !(firebase.app instanceof Function) || !firebase.app().options) {
      window.alert('You have not configured and imported the Firebase SDK. ' +
          'Make sure you go through the codelab setup instructions and make ' +
          'sure you are running the codelab using `firebase serve`');
    }
  };
  
  // Sets up shortcuts to Firebase features and initiate firebase auth.
  SubmitForm.prototype.initFirebase = function() {
    // Shortcuts to Firebase SDK features.
    // this.auth = firebase.auth();
    this.database = firebase.database();
    // this.storage = firebase.storage();
    // Initiates Firebase auth and listen to auth state changes.
    // this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));
  };
  

  
  window.onload = function() {
    window.SubmitForm = new SubmitForm();
  };
  