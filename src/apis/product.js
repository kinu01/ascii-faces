import axios from 'axios';
import { ENV } from '../Constants';
//this.apiConnector = axios.create(ENV.API);

export default axios.create(ENV.API);
