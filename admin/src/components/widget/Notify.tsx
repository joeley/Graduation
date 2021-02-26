import { notification } from 'antd';
import { IconType, ConfigProps } from 'antd/lib/notification';

export default (type: IconType, message: string, description: string) => {
    notification[type]({
        message,
        description: description,
    });
};
