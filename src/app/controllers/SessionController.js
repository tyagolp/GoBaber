const { User } = require('../models')

class SessionController {
  async create (req, res) {
    return res.render('auth/signin')
  }

  async store (req, res) {
    const { email, password } = req.body

    const user = await User.findOne({ where: { email } })

    if (!user) {
      req.flash('error', 'Usuario não encontrado')
      return res.redirect('/')
    }

    if (!(await user.checkPassworld(password))) {
      req.flash('error', 'Senha Incorreta')
      return res.redirect('/')
    }

    req.session.user = user

    if (user.provider) return res.redirect('/app/home')
    else return res.redirect('/app/dashboard')
  }

  destroy (req, res) {
    req.session.destroy(() => {
      res.clearCookie('root')
      return res.redirect('/')
    })
  }
}

module.exports = new SessionController()
