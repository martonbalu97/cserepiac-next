'use client'

import Select from 'react-select'
import useCities from '@/app/hooks/useCities';
import { PublicBaseSelectProps } from 'react-select/dist/declarations/src/Select';

export type CitySelectValue = {
    value: string;
    label:string;
    lat: string;
    long: string;
}

interface CitySelectProps {
    value?: CitySelectValue;
    onChange: (value: CitySelectValue) => void
}

const CitySelect: React.FC<CitySelectProps> = ({
    value,
    onChange
}) => {
    const {getAll} = useCities();

    return ( 
        <div>
            <Select
            placeholder="Bárhol"
            isClearable={true}
            value={value}
            onChange={(value) => onChange(value as CitySelectValue)}
            options={getAll()}
            classNames={{
                control: () => 'p-3 border-2',
                input: () => 'text-lg',
                option: () => 'text-lg'
            }}
            theme={(theme) => ({
                ...theme,
                borderRadius: 6,
                colors:{
                    ...theme.colors,
                    primary: 'black',
                    primary25:'#ffe4e6'
                }
            })}
           />
        </div>
        
     );
}
 
export default CitySelect;