interface Link {
  rel: string;
  href: string;
}

interface Properties {
  packagesadvertisement_requerequest_number: string;
  packagesadvertisement_requerequest_date: string;
  task_name: string;
  process_system_name: string;
  packagesadvertisement_requeblock: string;
  packagesadvertisement_requerequest_source_name: string;
  packagesadvertisement_requelicense_date: string;
  activity_system_name: string;
  task_state: number;
  packagesadvertisement_requeid: string;
  packagesadvertisement_requeactivity_type_name: string;
  packagesadvertisement_requeneighbourhood: string;
  packagesadvertisement_requepaci_number: string;
  task_performer_name: string;
  packagesadvertisement_requelicense_number: string;
  packagesadvertisement_requeparcel: string;
  task_date_sent: string;
  id: string;
  packagesadvertisement_requegovernorate: string;
}

export interface EntryBO {
  id: string;
  title: string;
  updated: string;
  summary: string;
  content: Content;
}

export interface TaskResponse {
  id: string;
  title: string;
  updated: string;
  author: string;
  links: Link[];
  entries: EntryBO[];
  total: number;
}

export interface Content {
  name: string;
  type: string;
  definition: string;
  properties: Properties;
  links: Link[];
  'content-type': string;
}
