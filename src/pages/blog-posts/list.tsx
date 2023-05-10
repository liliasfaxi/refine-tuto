import React from "react";
import { IResourceComponentsProps, BaseRecord, useMany } from "@refinedev/core";
import {
    useTable,
    List,
    EditButton,
    ShowButton,
    MarkdownField,
    DateField,
} from "@refinedev/antd";
import { Table, Space } from "antd";
import { DeleteButton } from "@refinedev/antd";

import { FilterDropdown, useSelect } from "@refinedev/antd";
import { Select } from "antd";

export const BlogPostList: React.FC<IResourceComponentsProps> = () => {
    const { selectProps: categorySelectProps } = useSelect({
        resource: "categories",
    });
    
    const { tableProps } = useTable({
        syncWithLocation: true,
    });

    const { data: categoryData, isLoading: categoryIsLoading } = useMany({
        resource: "categories",
        ids: tableProps?.dataSource?.map((item) => item?.category?.id) ?? [],
        queryOptions: {
            enabled: !!tableProps?.dataSource,
        },
    });

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="Id" />
                <Table.Column dataIndex="title" title="Title" />
                <Table.Column
                    dataIndex="content"
                    title="Content"
                    render={(value: any) => (
                        <MarkdownField value={value.slice(0, 80) + "..."} />
                    )}
                />
                <Table.Column
                    dataIndex={["category", "id"]}
                    title="Category"
                    render={(value) =>
                        categoryIsLoading ? (
                            <>Loading...</>
                        ) : (
                            categoryData?.data?.find(
                                (item) => item.id === value,
                            )?.title
                        )
                    }
                    filterDropdown={(props) => (
                        <FilterDropdown {...props}>
                            <Select
                                style={{ minWidth: 200 }}
                                mode="multiple"
                                placeholder="Select Category"
                                {...categorySelectProps}
                            />
                        </FilterDropdown>
                    )}
                />
                <Table.Column dataIndex="status" title="Status" />
                <Table.Column
                    dataIndex={["createdAt"]}
                    title="Created At"
                    render={(value: any) => <DateField value={value} />}
                />
                <Table.Column
                    title="Actions"
                    dataIndex="actions"
                    render={(_, record: BaseRecord) => (
                        <Space>
                            <EditButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                            <ShowButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                                
                            />
                            <DeleteButton 
                                hideText 
                                size="small" 
                                recordItemId={record.id} 
                            />
                        </Space>
                    )}
                />
               
            </Table>
        </List>
    );
};
