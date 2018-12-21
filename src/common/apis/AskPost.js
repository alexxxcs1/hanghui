import qs from 'qs';
const AskPost = (ajaxinstance) => {
    const customer = {}

    customer.Login = (username, gonghao, sex) => {
        return ajaxinstance.post('Login', qs.stringify({
            username,
            gonghao,
            sex
        }));
    }
    customer.isAuth = () => {
        return ajaxinstance.post('isLogin');
    }
    customer.getAuth = (url) => {
        return ajaxinstance.post('authurl', qs.stringify({
            url
        }));
    }
    customer.getShare = (url) => {
        return ajaxinstance.post('getShare', qs.stringify({
            url
        }));
    }
    customer.getQuestion = () => {
        return ajaxinstance.post('getQuestion');
    }
    customer.getResult = (formdata) => {
        return ajaxinstance.post('save', formdata);
    }

    return customer
}

export default AskPost