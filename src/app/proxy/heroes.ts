
import services from '../services'

// fetchOne
export async function fetchOne (id: string): Promise<any > {
  return services.hahow.fetchHeroOne(id)
}

// fetchAll
export async function fetchAll (): Promise<any > {
  let heroes = await services.hahow.fetchHeroAll()
  return heroes
}

// fetchProfile
export async function fetchProfile (hero: any): Promise<any > {
  let proflie = await services.hahow.fetchHeroProfile(hero.id)
  hero.proflie = proflie
  return hero
}

// fetchAllProfile
export async function fetchAllProfile (heroes: any): Promise<any > {
  heroes = await Promise.all(heroes.map(fetchProfile))
  return heroes
}
