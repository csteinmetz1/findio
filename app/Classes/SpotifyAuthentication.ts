import { keys } from '../keys'

export const authOptions = {
  uri: 'https://accounts.spotify.com/api/token',
  headers: {
    Authorization: 'Basic ' + (Buffer.from(keys.client_id + ':' + keys.client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  }
}