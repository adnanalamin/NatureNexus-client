import { useState } from "react";
import { Helmet } from "react-helmet";



const RequestTourGuid = () => {
   
    const [requestStatus, setRequestStatus] = useState('');
    const [buttonClicked, setButtonClicked] = useState(false);


    const handleRequest = async() => {
        
        setRequestStatus('Your request to be a tour guide has been submitted');
        setButtonClicked(true);
    };
    return (
        <div>
            <Helmet>
      <title>Nature Nexus | Request Tour Guid</title>
      </Helmet>
             <div className="max-w-md mx-auto">
            <button
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${buttonClicked ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={handleRequest}
                disabled={buttonClicked}
            >
                {buttonClicked ? 'Request Submitted' : 'Request to be a Tour Guide'}
            </button>
            {requestStatus && (
                <div className="mt-4 text-green-700 font-roboto text-3xl font-bold">{requestStatus}</div>
            )}
        </div>
        </div>
    );
};

export default RequestTourGuid;