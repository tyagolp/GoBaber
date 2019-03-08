const moment = require('moment')
const { Op } = require('sequelize')
const { Appointment, User } = require('../models')

class HomeController {
  async index (req, res) {
    // eslint-disable-next-line camelcase
    const { id: provider_id } = req.session.user
    const appointments = await Appointment.findAll({
      where: {
        provider_id,
        date: {
          [Op.between]: [
            moment()
              .startOf('day')
              .format(),
            moment()
              .endOf('day')
              .format()
          ]
        }
      },
      include: [
        {
          model: User,
          as: 'user_log'
        },
        {
          model: User
        }
      ]
    })

    appointments.map(item => {
      console.log(item.date)
      item.data = moment(item.date).format('DD/MM/YYYY HH:mm')
      console.log(item.data)
    })

    return res.render('home', { appointments })
  }
}

module.exports = new HomeController()
