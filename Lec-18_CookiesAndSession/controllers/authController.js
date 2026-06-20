
const user=require('../models/user');

exports.getLogin=(req, res, next) => {
  res.render('auth/Login', { pageTitle: 'Login', errorMessage: null , isLoggedIn: false});
};

exports.postLogin = (req, res, next) => {
    const { email, password } = req.body;

    user.findOne({ email: email })
        .then(foundUser => {
            if (!foundUser) {
                return res.render('auth/Login', {
                    pageTitle: 'Login',
                    errorMessage: 'Email not found',
                    isLoggedIn:req.isLoggedIn
                });
            }

            if (foundUser.password !== password) {
                return res.render('auth/Login', {
                    pageTitle: 'Login',
                    errorMessage: 'Incorrect password',
                    isLoggedIn:req.isLoggedIn
                });
            }
            console.log('Login successful for user:', foundUser.username);
          req.session.isLoggedIn = true;
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
            res.render('auth/Login', {
                pageTitle: 'Login',
                errorMessage: 'An error occurred during login'
            });
        });
};

exports.getSignUp=(req, res, next) => {
  res.render('auth/SignUp', { pageTitle: 'SignUp' , isLoggedIn: false});
};

exports.postSignUp = (req, res, next) => {
  const { username, email, password } = req.body;

  const newUser = new user({
    username,
    email,
    password
  });

  newUser.save()
    .then(() => {
      res.redirect('/auth/login');
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('Error creating user');
    });
};

exports.postLogout = (req, res, next) => {

  req.session.destroy(()=>{
     res.redirect('/');
  }) ; 
 
}
 
