import {Request} from './Request';

export function RequestList({ requests }) {
    const count = requests.length;
    let heading = "";
    if (count > 0) {
      const noun = count > 1 ? 'Requests' : 'Request';
      heading = count + ' ' + noun;
    }
    return (
      <section>
        <h1>{heading}</h1>
        {requests.map(request =>
            <a>
              <Request request={request}  />  
            </a>
        )}
      </section>
    );
}