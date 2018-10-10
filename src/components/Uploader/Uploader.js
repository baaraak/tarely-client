import * as React from 'react';
import { polyfill } from 'react-lifecycles-compat';
import RcUpload from 'rc-upload';
import classNames from 'classnames';
import uniqBy from 'lodash/uniqBy';
import UploadList from './UploaderList';
import { T, fileToObject, genPercentAdd, getFileItem, removeFileItem } from './utils';
import { AwesomeButton } from 'react-awesome-button';

import './uploader.css';
class Uploader extends React.Component {

    static defaultProps = {
        prefixCls: 'ant-upload',
        type: 'select',
        multiple: false,
        action: '',
        data: {},
        accept: '',
        beforeUpload: T,
        showUploadList: true,
        listType: 'text',
        className: '',
        disabled: false,
        supportServerRender: true,
    };

    static getDerivedStateFromProps(nextProps) {
        if ('fileList' in nextProps) {
            return {
                fileList: nextProps.fileList || [],
            };
        }
        return null;
    }

    constructor(props) {
        super(props);

        this.state = {
            fileList: props.fileList || props.defaultFileList || [],
            dragState: 'drop',
        };
    }

    componentWillUnmount() {
        this.clearProgressTimer();
    }

    onStart = (file) => {
        const targetItem = fileToObject(file);
        targetItem.status = 'uploading';

        const nextFileList = this.state.fileList.concat();

        const fileIndex = nextFileList.findIndex(({ uid }) => uid === targetItem.uid);
        if (fileIndex === -1) {
            nextFileList.push(targetItem);
        } else {
            nextFileList[fileIndex] = targetItem;
        }

        this.onChange({
            file: targetItem,
            fileList: nextFileList,
        });
        // fix ie progress
        if (!(window).FormData) {
            this.autoUpdateProgress(0, targetItem);
        }
    }

    autoUpdateProgress(_, file) {
        const getPercent = genPercentAdd();
        let curPercent = 0;
        this.clearProgressTimer();
        this.progressTimer = setInterval(() => {
            curPercent = getPercent(curPercent);
            this.onProgress({
                percent: curPercent * 100,
            }, file);
        }, 200);
    }

    onSuccess = (response, file) => {
        this.clearProgressTimer();
        try {
            if (typeof response === 'string') {
                response = JSON.parse(response);
            }
        } catch (e) { /* do nothing */
        }
        let fileList = this.state.fileList;
        let targetItem = getFileItem(file, fileList);
        // removed
        if (!targetItem) {
            return;
        }
        targetItem.status = 'done';
        targetItem.response = response;
        this.onChange({
            file: { ...targetItem },
            fileList,
        });
    }

    onProgress = (e, file) => {
        let fileList = this.state.fileList;
        let targetItem = getFileItem(file, fileList);
        // removed
        if (!targetItem) {
            return;
        }
        targetItem.percent = e.percent;
        this.onChange({
            event: e,
            file: { ...targetItem },
            fileList: this.state.fileList,
        });
    }

    onError = (error, response, file) => {
        this.clearProgressTimer();
        let fileList = this.state.fileList;
        let targetItem = getFileItem(file, fileList);
        // removed
        if (!targetItem) {
            return;
        }
        targetItem.error = error;
        targetItem.response = response;
        targetItem.status = 'error';
        this.onChange({
            file: { ...targetItem },
            fileList,
        });
    }

    handleRemove(file) {
        const { onRemove } = this.props;

        Promise.resolve(typeof onRemove === 'function' ? onRemove(file) : onRemove).then(ret => {
            // Prevent removing file
            if (ret === false) {
                return;
            }

            const removedFileList = removeFileItem(file, this.state.fileList);
            if (removedFileList) {
                this.onChange({
                    file,
                    fileList: removedFileList,
                });
            }
        });
    }

    handleManualRemove = (file) => {
        this.upload.abort(file);
        file.status = 'removed'; // eslint-disable-line
        this.handleRemove(file);
    }

    onChange = (info) => {
        if (!('fileList' in this.props)) {
            this.setState({ fileList: info.fileList });
        }

        const { onChange } = this.props;
        if (onChange) {
            onChange(info);
        }
    }

    onFileDrop = (e) => {
        this.setState({
            dragState: e.type,
        });
    }

    beforeUpload = (file, fileList) => {
        if (!this.props.beforeUpload) {
            return true;
        }
        const result = this.props.beforeUpload(file, fileList);
        if (result === false) {
            this.onChange({
                file,
                fileList: uniqBy(
                    this.state.fileList.concat(fileList.map(fileToObject)),
                    (item) => item.uid,
                ),
            });
            return false;
        } else if (result && (result).then) {
            return result;
        }
        return true;
    }

    clearProgressTimer() {
        clearInterval(this.progressTimer);
    }

    saveUpload = (node) => {
        this.upload = node;
    }

    renderUploadList = (locale) => {
        const { showUploadList, listType, onPreview } = this.props;
        const { showRemoveIcon, showPreviewIcon } = showUploadList;
        return (
            <UploadList
                listType={listType}
                items={this.state.fileList}
                onPreview={onPreview}
                onRemove={this.handleManualRemove}
                showRemoveIcon={showRemoveIcon}
                showPreviewIcon={showPreviewIcon}
                locale={{ ...locale, ...this.props.locale }}
            />
        );
    }

    render() {
        const {
            prefixCls = '',
            className,
            listType,
            disabled,
        } = this.props;

        const rcUploadProps = {
            onStart: this.onStart,
            onError: this.onError,
            onProgress: this.onProgress,
            onSuccess: this.onSuccess,
            ...this.props,
            beforeUpload: this.beforeUpload,
        };

        delete rcUploadProps.className;

        const uploadButtonCls = classNames(prefixCls, {
            [`${prefixCls}-select`]: true,
            [`${prefixCls}-select-${listType}`]: true,
            [`${prefixCls}-disabled`]: disabled,
        });

        const uploadButton = (
            <div className={uploadButtonCls} ref={this.saveUpload}>
                <RcUpload {...rcUploadProps} ref={this.saveUpload}>
                    <AwesomeButton size="small" >
                        Upload
                </AwesomeButton>
                </RcUpload>
            </div>
        );

        return (
            <span className={className}>
                {uploadButton}
                {/* {uploadList} */}
            </span>
        );
    }
}

polyfill(Uploader);

export default Uploader;