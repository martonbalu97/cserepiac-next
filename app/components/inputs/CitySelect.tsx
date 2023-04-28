'use client'

import Select, { GroupBase, OptionsOrGroups } from 'react-select'
import useCities from '@/app/hooks/useCities';
import { PublicBaseSelectProps } from 'react-select/dist/declarations/src/Select';

export type CitySelectValue = {
    value: string | null;
    label:string | null;
    lat: string | null;
    long: string | null;
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
            options={getAll() as OptionsOrGroups<CitySelectValue, GroupBase<CitySelectValue>>}
            value={value as CitySelectValue} 
            onChange={(value) => onChange(value as CitySelectValue)}
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