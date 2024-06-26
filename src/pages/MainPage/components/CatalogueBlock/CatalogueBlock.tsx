import { useEffect } from 'react';
import CatalogueItem from './CatalogueItem/CatalogueItem';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { fetchSixCategoriesWithPhoto } from '../../../../store/reducers/homepageCategoriesSlice';
import renderServerData from '../../../../helpers/renderServerData';
import './CatalogueBlock.scss';
import transliterate from '../../../../utils/transliterate';

type CategoryType = {
    categoryId: string;
    categoryName: string;
    imagePath: string;
    imageSize: string;
};

const CatalogueBlock = () => {
    const dispatch = useAppDispatch();
    const { data, loading, error } = useAppSelector(
        (state) => state.homepageCategories
    );

    useEffect(() => {
        if (data.length === 0) {
            dispatch(fetchSixCategoriesWithPhoto());
        }
    }, [dispatch]);

    const renderCategories = () => {
        const sortedData = [...data];
        sortedData.sort((first, second) => {
            const firstItemImgWidth = first.imageSize.replace(/x\d+/g, '');
            const secondItemImgWidth = second.imageSize.replace(/x\d+/g, '');
            if (+firstItemImgWidth > +secondItemImgWidth) {
                return -1;
            }
            return 1;
        });
        const render = sortedData
            .map((category: CategoryType, index) => {
                const { categoryName, imagePath, categoryId } = category;
                if (index === 1) return null;
                return (
                    <CatalogueItem
                        className="catalogue__item item1"
                        key={`catalogue-category-${categoryId}-${categoryName}`}
                        href={`/catalog/${transliterate(
                            categoryName
                        )}&categoryId=${categoryId}`}
                        title={categoryName}
                        alt={categoryName}
                        srcImg={imagePath}
                    />
                );
            })
            .filter((category) => category !== null);
        render.push(
            <CatalogueItem
                className="catalogue__item item1"
                key={`catalogue-category-${sortedData[1].categoryId}-${sortedData[1].categoryName}`}
                href={`/catalog/${transliterate(
                    sortedData[1].categoryName
                )}&categoryId=${sortedData[1].categoryId}`}
                title={sortedData[1].categoryName}
                alt={sortedData[1].categoryName}
                srcImg={sortedData[1].imagePath}
            />
        );
        return render as JSX.Element[];
    };
    return (
        <section className="catalogue">
            <div className="container">
                {renderServerData({
                    error,
                    loading,
                    content: renderCategories,
                })}
            </div>
        </section>
    );
};

export default CatalogueBlock;
