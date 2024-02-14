import type { INote, ICustomer } from '../types'

type Params = {
  year: string;
  month: string;
  day: string;
  note: Omit<INote, '_id'>,
  id: string;
  name: string;
  client: Omit<ICustomer,'_id'>
}


class ApiController  {

  static readonly path = {
    getNotesByMonth: '/notesByMonth',
    addNote: '/addNote',
    updateNote: '/updateNote',
    deleteNote: '/deleteNote',
    searchClients: '/getClients',
    addClient: '/addClient'
  }

  public static async getNotesByMonth(month: Params['month'], year: Params['year']): Promise<INote[]> {
    const url = new URL(this.path.getNotesByMonth, import.meta.env.VITE_API_URL)
    url.searchParams.append('month',month)
    url.searchParams.append('year', year)
    try {
      const response = await fetch(url)
      return response.json()
    } catch (error) {
      console.log(error)
      return []
    }
  }

  public static async addNote(note: Params['note']): Promise<INote | undefined> {
    const url = new URL(this.path.addNote, import.meta.env.VITE_API_URL)
    try {
      const response = await fetch(url,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(note)
      })
      return response.json()
    } catch (error) {
      console.log(error)
    }
  }

  public static async updateNote(note: Params['note'], id: Params['id']): Promise<INote | undefined> {
    const url = new URL(this.path.updateNote, import.meta.env.VITE_API_URL)
    try {
      const response = await fetch(url,{
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({id,data: note})
      })
      return response.json()
    } catch (error) {
      console.log(error)
    }
  }

  public static async deleteNote(id: Params['id']): Promise<string | undefined> {
    const url = new URL(this.path.deleteNote, import.meta.env.VITE_API_URL)
    url.searchParams.append('id',id)
    try {
      await fetch(url,{method: 'DELETE'})
      return id
    } catch (error) {
      console.log(error)
    }
  }

  public static async serchClients(name: Params['name']): Promise<ICustomer[]> {
    const url = new URL(this.path.searchClients, import.meta.env.VITE_API_URL)
    url.searchParams.append('name',name)
    try {
      const response = await fetch(url)
      return response.json()
    } catch (error) {
      console.log(error)
      return []
    }
  }

  public static async addClient(data: Params['client']): Promise<ICustomer | undefined> {
    const url = new URL(this.path.addClient, import.meta.env.VITE_API_URL)
    try {
      const response = await fetch(url,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })
      return response.json()
    } catch (error) {
      console.log(error)
    }
  }
}



export default ApiController