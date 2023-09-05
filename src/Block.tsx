import { useAssetUpload, useBlockAssets, useFileInput } from '@frontify/app-bridge';
import { Button } from '@frontify/fondue';
import '@frontify/fondue-tokens/styles';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import { useEffect, useState } from 'react';
import Car from './CarBlock';
import './index.css';

import { ASSET_SETTINGS_ID } from './settings';

export const ContentBlock = ({ appBridge }: BlockProps) => {
    const { blockAssets, updateAssetIdsFromKey } = useBlockAssets(appBridge);
    const [loading, setLoading] = useState(false);
    const [openFileDialog, { selectedFiles }] = useFileInput({});
    const [isSended, setValue] = useState(false);
    const [uploadFile, { results: uploadResults, doneAll }] = useAssetUpload({
        onUploadProgress: () => !loading && setLoading(true),
    });

    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
    };

    useEffect(() => {
        if (selectedFiles) {
            setLoading(true);
            uploadFile(selectedFiles);
        }
    }, [selectedFiles, uploadFile]);

    useEffect(() => {
        if (doneAll) {
            (async (uploadResults) => {
                const assetIds = uploadResults.map((uploadResult) => uploadResult.id);
                await updateAssetIdsFromKey(ASSET_SETTINGS_ID, assetIds);
                setLoading(false);
            })(uploadResults);
        }
    }, [doneAll, uploadResults]);

    const onOpenAssetChooser = () => {
        appBridge.openAssetChooser(
            (assets) => {
                const assetId = assets[0].id;
                updateAssetIdsFromKey(ASSET_SETTINGS_ID, [assetId]);
                appBridge.closeAssetChooser();
            },
            {
                selectedValueId: blockAssets[ASSET_SETTINGS_ID]?.[0]?.id,
            },
        );
    };

    const formSend = () => {
        setValue(!isSended);
    };

    // function handleSubmit(e: { preventDefault: () => void; target: { elements: { username: any; password: any } } }) {
    //     e.preventDefault();
    //     const { username, password } = e.target.elements;
    //     console.log({ username: username.value, password: password.value });
    // }

    return (
        <div className="tw-flex tw-flex-col tw-gap-4">
            <section className="card-container">
                <Car
                    body="Do laborum sunt ut ex cupidatat exercitation.
                    Do laborum sunt ut ex cupidatat exercitation. "
                    title="Car 1"
                    image="https://source.unsplash.com/random"
                ></Car>
                <Car
                    body="Do laborum sunt ut ex cupidatat exercitation. Do laborum sunt ut ex cupidatat exercitation. "
                    title="Car 2"
                    image="https://source.unsplash.com/random"
                ></Car>
                <Car
                    body="Do laborum sunt ut ex cupidatat exercitation. Do laborum sunt ut ex cupidatat exercitation."
                    title="Car 3"
                    image="https://source.unsplash.com/random"
                ></Car>
                <Car
                    body="Do laborum sunt ut ex cupidatat exercitation. Do laborum sunt ut ex cupidatat exercitation."
                    title="Car 4"
                    image="https://source.unsplash.com/random"
                ></Car>
            </section>
            <Button onClick={toggleModal}>Reservation</Button>

            <h2>Do not see your dream car here?</h2>
            <h5>File out the form, send it to us - we will try to get it for you. </h5>
            <div className="tw-flex tw-gap-4">
                <Button onClick={onOpenAssetChooser}>Open asset chooser</Button>
                <Button onClick={openFileDialog}>{loading ? 'Uploading...' : 'Upload'}</Button>
            </div>
            <form>
                <label className="label1">
                    E-mail:
                    <input type="text" name="name" />
                    Phone number:
                    <input type="text" name="name" />
                </label>
                <input type="submit" value={isSended ? 'Sended!' : 'Send'} onClick={formSend} />
            </form>

            {modal && (
                <div className="modal">
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className="modal-content">
                        <h2>Make your reservation</h2>
                        <form>
                            Name:
                            <input type="text" name="name" id="name" />
                            LastName:
                            <input type="text" name="name" id="lastname" />
                            E-mail:
                            <input type="text" name="name" id="email" />
                            Phone number:
                            <input type="text" name="name" id="number" />
                            Car:
                            <select id="cars" name="cars">
                                <option value="australia">Car 1</option>
                                <option value="canada">Car 2</option>
                                <option value="usa">Car 3</option>
                                <option value="usa">Car 4</option>
                            </select>
                            Date:
                            <input type="date" name="name" id="name" />
                            <input type="submit" value={isSended ? 'Sended!' : 'Send'} />
                        </form>
                        <button className="close-modal" onClick={toggleModal}>
                            CLOSE
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
