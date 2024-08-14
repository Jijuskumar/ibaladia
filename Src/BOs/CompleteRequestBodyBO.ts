export interface CompleteRequestBO {
  app_url: string;
  status_url: string;
  request_body: {
    complete: {
      data: {
        packages: {
          advertisement_request: {
            properties: {
              request_status_name: string;
              request_status: number;
              comments: string;
              id: string;
            };
            href: string;
          };
        };
        variables: any;
      };
    };
  };
}
