import { useEffect } from 'react';
import nextId from 'react-id-generator';
import CatalogueItem from './CatalogueItem/CatalogueItem';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { fetchSixCategoriesWithPhoto } from '../../../../store/reducers/homepageCategoriesSlice';
import renderServerData from '../../../../helpers/renderServerData';
import './CatalogueBlock.scss';

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
        dispatch(fetchSixCategoriesWithPhoto());
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
                const { categoryName, imagePath } = category;
                if (index === 1) return null;
                return (
                    <CatalogueItem
                        className="catalogue__item item1"
                        key={nextId('category-home-page')}
                        href={`/catalog/${categoryName}`}
                        title={categoryName}
                        alt={categoryName}
                        srcImg={imagePath}
                        srcWebp={imagePath}
                    />
                );
            })
            .filter((category) => category !== null);
        render.push(
            <CatalogueItem
                className="catalogue__item item1"
                key={nextId('category-home-page')}
                href={`/catalog/${sortedData[1].categoryName}`}
                title={sortedData[1].categoryName}
                alt={sortedData[1].categoryName}
                srcImg={sortedData[1].imagePath}
                srcWebp={sortedData[1].imagePath}
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
