
import services from '../services'

// verify
export async function verify (name: string, password: string): Promise<any > {
  return services.hahow.fetchAuth(name, password)
}
