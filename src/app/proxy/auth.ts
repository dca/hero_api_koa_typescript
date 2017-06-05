
import services from '../services'

// verify
export async function verify (name: string, password: string): Promise<any > {
  return await services.hahow.fetchAuth(name, password)
}
