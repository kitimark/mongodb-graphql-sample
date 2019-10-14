import Team from '../../models/Team'

const getTeamService = ({ input = {} }, callback) => {
  const perPage = input.per_page || 10
  const currentPage = (input.current_page > 0 ? input.current_page : 1)
  const teamModel = Team.where('fullname')
  const countTeamModel = Team.where('fullname')

  if(input.keyword && input.keyword !== '') {
    const words = input.keyword.split(' ')
    if (words.length <= 1) {
      teamModel.regex(new RegExp(words[0], 'i'))
      countTeamModel.regex(new RegExp(words[0], 'i'))
    } else {
      let regxPattern = words.map(words => `(?=.${words})`).join('')
      regxPattern += '.*'
      teamModel.regex(new RegExp(regxPattern, 'i'))
      countTeamModel.regex(new RegExp(regxPattern, 'i'))
    }
  }

  Promise.all([
    teamModel.skip(perPage * (currentPage - 1))
      .sort({ fullname: 'asc' })
      .limit(perPage)
      .exec(),
    countTeamModel.count()
  ]).then(values => {
    const docs = values[0]
    const totalDocs = values[1]
    const lastPage= Math.ceil(totalDocs/perPage)
    const result = {
      meta: {
        status: 200,
        message: 'Success',
        total: totalDocs,
        current_page: currentPage,
        per_page: perPage,
        last_page: lastPage
      },
      data: docs,
      errors: []
    }
    callback(result)
  }, errors => {
    const err = {
      errors: [
        {
          code: 500,
          message: 'Internal Server Error'
        },
        errors
      ]
    }
    callback(err)
  })
}

const createTeamService = ({ input = {} }, callback) => {
  const team = new Team({
    ...input.team
  })
  team.save((saveErr, saveResult) => {
    if (saveResult) {
      const result = {
        meta: {
          status: 201,
          message: 'Create Team Successfully'
        },
        data: [saveResult],
        errors: []
      }
      callback(result)
    } else {
      const err = {
        errors: [
          {
            code: saveErr.status,
            message: saveErr.message
          }
        ]
      }
      callback(err)
    }
  })
}

export {
  getTeamService,
  createTeamService
}