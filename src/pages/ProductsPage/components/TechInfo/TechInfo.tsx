import { useState } from 'react';
import Input from 'components/Input';
import Button from 'components/Button';
import styles from 'pages/ProductsPage/components//TechInfo.module.scss';
import MultiDropdown from 'components/MultiDropdown';
import Text from 'components/Text';
import type { Option } from 'components/MultiDropdown';

export type TechInfoProps = {
  total?: number;
  loading?: boolean;
};

const TechInfo = ({ total = 0, loading = false }: TechInfoProps) => {
  const [selectedCities, setSelectedCities] = useState<Option[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className={styles.container}>
      <div className={styles.fieldSearch}>
        <Input
          value={searchQuery}
          placeholder="Search product"
          className={styles.input}
          onChange={setSearchQuery}
        />
        <Button>Find now</Button>
      </div>
      <MultiDropdown
        className={styles.dropdown}
        options={[]} /* дополнить вариантами для сортировки в последующих дз */
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
