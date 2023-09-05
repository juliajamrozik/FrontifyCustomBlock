import { CardInterface } from './types';
import styles from './Card.module.css';
import { Button } from '@frontify/fondue';
import { useState } from 'react';

const Car = ({ body, title, image }: CardInterface) => {
    const [readMore, setValue] = useState(false);
    const ReadMoreComponent = () => {
        setValue(!readMore);
    };

    return (
        <article className={`stack-lg ${styles.card}`}>
            {image && <img src={image} className={styles.image} />}
            <div className="stack-sm">
                <h3 className={styles.title}>{title}</h3>
            </div>
            <p className={styles.body}>{body}</p>
            {readMore && (
                <div className="more">
                    <div className="read-more">
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident perferendis suscipit
                            officia recusandae, eveniet quaerat assumenda id fugit, dignissimos maxime non natus placeat
                            illo iusto! Sapiente dolorum id maiores dolores?
                        </p>
                    </div>
                </div>
            )}
            <div className="mb-10">
                <Button onClick={ReadMoreComponent}>{readMore ? 'Show less' : 'Read more'}</Button>
            </div>
        </article>
    );
};
export default Car;
