//exporting const Authorization to using in headers

const Authorization =  {
    'Authorization': 'bearer' + localStorage.getItem('token')
}

export default Authorization;