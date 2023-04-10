export interface IUsers {
  id: number;
  name: string;
  email: string,
  phone: string,
  position: string,
  position_id: string,
  registration_timestamp: number,
  photo: string;
}

export interface IGetResponse {
  success: boolean,
  page: number,
  total_pages: number,
  total_users: number,
  count: number,
  links: {
    next_url: string | null,
    prev_url: string | null,
  },
  users: IUsers[]
}