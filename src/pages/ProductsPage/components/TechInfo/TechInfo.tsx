import { useState, useEffect, useMemo } from 'react';
import Input from 'components/Input';
import Button from 'components/Button';
import styles from 'pages/ProductsPage/components/TechInfo/TechInfo.module.scss';
import MultiDropdown from 'components/MultiDropdown';
import Text from 'components/Text';
import type { Option } from 'components/MultiDropdown';

export type TechInfoProps = {
  total?: number;
  loading?: boolean;
  searchValue?: string;
  onSearchSubmit?: (value: string) => void;
  categoryOptions?: Option[];
  selectedCategoryIds?: number[];
  onCategoryChange?: (ids: number[]) => void;
  /** Clear только поисковую строку */
  onClearSearch?: () => void;
  /** Clear только фильтр категорий */
  onClearCategory?: () => void;
};

const TechInfo = ({
  total = 0,
  loading = false,
  searchValue = '',
  onSearchSubmit,
  categoryOptions = [],
  selectedCategoryIds = [],
  onCategoryChange,
  onClearSearch,
  onClearCategory,
}: TechInfoProps) => {
  const [searchQuery, setSearchQuery] = useState(searchValue);

  const selectedCategoryOptions = useMemo(
    () => categoryOptions.filter((opt) => selectedCategoryIds.includes(parseInt(opt.key, 10))),
    [categoryOptions, selectedCategoryIds]
  );

  useEffect(() => {
    setSearchQuery(searchValue);
  }, [searchValue]);

  const handleSubmit = () => {
    onSearchSubmit?.(searchQuery);
  };

  const handleCategoryChange = (options: Option[]) => {
    onCategoryChange?.(options.map((o) => parseInt(o.key, 10)));
  };

  const hasSearch = Boolean(searchValue.trim());
  const hasCategoryFilter = Boolean(selectedCategoryIds.length);

  return (
    <div className={styles.container}>
      <div className={styles.fieldSearch}>
        <Input
          value={searchQuery}
          placeholder="Search product"
          className={styles.input}
          onChange={setSearchQuery}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        />
        <Button type="button" onClick={handleSubmit}>
          Find now
        </Button>
        {hasSearch && onClearSearch && (
          <Button type="button" onClick={onClearSearch} className={styles.clearSearchBtn}>
            Clear
          </Button>
        )}
      </div>
      <div className={styles.filtersRow}>
        <MultiDropdown
          className={styles.dropdown}
          options={categoryOptions}
          value={selectedCategoryOptions}
          onChange={handleCategoryChange}
          getTitle={(value) =>
            value.length ? value.map((option) => option.value).join(', ') : 'Filter'
          }
        />
        {hasCategoryFilter && onClearCategory && (
          <Button type="button" onClick={onClearCategory} className={styles.clearBtn}>
            Clear
          </Button>
        )}
      </div>
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
