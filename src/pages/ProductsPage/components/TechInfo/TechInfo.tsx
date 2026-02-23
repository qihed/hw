import { useState } from 'react';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import styles from './TechInfo.module.scss';
import MultiDropdown from '../../../../components/MultiDropdown';
import Text from '../../../../components/Text';
import type { Option } from '../../../../components/MultiDropdown/MultiDropdown';

const CITY_OPTIONS: Option[] = [
  { key: 'msk', value: 'Moscow' },
  { key: 'spb', value: 'Saint Petersburg' },
  { key: 'ekb', value: 'Yekaterinburg' },
];

export type TechInfoProps = {
  total?: number;
  loading?: boolean;
};

const TechInfo = ({ total = 0, loading = false }: TechInfoProps) => {
  const [selectedCities, setSelectedCities] = useState<Option[]>([]);

  return (
    <div className={styles.container}>
      <div className={styles.fieldSearch}>
        <Input
          value=""
          placeholder="Search product"
          className={styles.input}
          onChange={(value: string) => console.log(value)}
        />
        <Button>Find now</Button>
      </div>
      <MultiDropdown
        className={styles.dropdown}
        options={CITY_OPTIONS}
        value={selectedCities}
        onChange={setSelectedCities}
        getTitle={(value) =>
          value.length ? value.map((option) => option.value).join(', ') : 'Filter'
        }
      />
      <div className={styles.numFrame}>
        <Text className={styles.text}>Total products</Text>
        <Text className={styles.textNum} view="p-20">
          {loading ? '…' : total}
        </Text>
      </div>
    </div>
  );
};

export default TechInfo;
