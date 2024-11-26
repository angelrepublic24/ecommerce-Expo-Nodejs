import { Request } from 'express';
import validator from 'validator';

export const productValidate = (body) => {
    const name = !validator.isEmpty(body.name) &&
                    validator.isLength(body.name, {min:3, max: undefined})
                    validator.isAlpha(body.name, 'en-US');

    const price = !validator.isEmpty(body.price)  &&
                    validator.isFloat(body.price);

    if(body.description){
        const description = validator.isLength(body.description, {min:3, max: 350})
        if(!description){
            throw new Error('Invalid description');
        }else{
            console.log('Description validation succeeded');
        }
    }

    if(!name || !price){
        throw new Error('Invalid name or price');
    }else{
        console.log('Validation succeeded');
    }
}
