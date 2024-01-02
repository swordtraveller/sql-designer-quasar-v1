<template>
    <div style="margin-left: 15vw; margin-right: 15vw; margin-top: 5vh">
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
            <q-input
                filled
                v-model="tableSchema.name"
                style="width: 62vw"
                label="Table Name"
                lazy-rules
                :rules="[
                    (val) =>
                        (val && val.length > 0) || 'Please type table name',
                ]"
            />
            <q-checkbox
                v-model="tableSchema.ifNotExists"
                label="IF NOT EXISTS"
            />
            <q-separator style="margin-bottom: 2vh; width: 62vw" />
            <div
                v-for="(value, index) in tableSchema.fieldsList"
                :key="index"
                class="q-gutter-lg"
                style="display: flex; justify-content: row"
            >
                <q-input
                    filled
                    v-model="tableSchema.fieldsList[index].name"
                    label="Field Name"
                    style="width: 15vw; margin-left: 2.5rem"
                    lazy-rules
                    :rules="[
                        (val) =>
                            (val && val.length > 0) || 'Please type field name',
                    ]"
                />
                <q-select
                    label="Field Type"
                    style="width: 15vw"
                    transition-show="jump-up"
                    transition-hide="jump-up"
                    filled
                    v-model="tableSchema.fieldsList[index].type"
                    :options="dataTypeKinds"
                />
                <q-input
                    filled
                    v-model="tableSchema.fieldsList[index].comment"
                    label="Comment"
                    style="width: 15vw"
                    lazy-rules
                />
                <div style="display: flex; justify-content: row">
                    <q-checkbox
                        v-model="tableSchema.fieldsList[index].notNullable"
                        label="Not Null"
                    />
                    <q-btn
                        outline
                        size="xs"
                        style="
                            height: 2rem;
                            width: 1rem;
                            margin-top: 1.25rem;
                            margin-left: 1rem;
                        "
                        color="primary"
                        icon="remove"
                        @click="removeField(index)"
                    />
                </div>
            </div>
            <q-btn outline color="primary" icon="add" @click="addField" />
            <q-separator style="width: 62vw" />
            <div
                style="display: flex; flex-direction: row; align-items: center"
            >
                <q-select
                    label="Auto Increment Key"
                    transition-show="jump-up"
                    transition-hide="jump-up"
                    filled
                    v-model="tableSchema.autoIncrementKey"
                    :options="fieldListOption"
                    style="width: 15vw"
                >
                    <template v-slot:append>
                        <q-icon
                            name="close"
                            @click.stop.prevent="
                                tableSchema.autoIncrementKey = ''
                            "
                            class="cursor-pointer"
                        />
                    </template>
                </q-select>
                <q-icon
                    name="info"
                    style="font-size: 1.5rem; margin-left: 1cap; color: #ccc"
                >
                    <q-tooltip>
                        The auto-increment key of the table is unique.
                    </q-tooltip>
                </q-icon>
            </div>
            <div
                style="display: flex; flex-direction: row; align-items: center"
            >
                <q-select
                    label="Primary Key"
                    transition-show="jump-up"
                    transition-hide="jump-up"
                    filled
                    v-model="tableSchema.primaryKey"
                    :options="fieldListOption"
                    style="width: 15vw"
                >
                    <template v-slot:append>
                        <q-icon
                            name="close"
                            @click.stop.prevent="tableSchema.primaryKey = ''"
                            class="cursor-pointer"
                        />
                    </template>
                </q-select>
                <q-icon
                    name="info"
                    style="font-size: 1.5rem; margin-left: 1cap; color: #ccc"
                >
                    <q-tooltip>
                        The primary key of the table is unique.
                    </q-tooltip>
                </q-icon>
            </div>
            <q-select
                label="Engine"
                transition-show="jump-up"
                transition-hide="jump-up"
                filled
                v-model="tableSchema.engine"
                :options="engineKinds"
                style="width: 15vw"
            />
            <q-select
                label="Default Charset"
                transition-show="jump-up"
                transition-hide="jump-up"
                filled
                v-model="tableSchema.charset"
                :options="charsetKinds"
                style="width: 15vw"
            />
            <div style="margin-bottom: 2vh">
                <q-btn
                    label="Submit"
                    icon="check"
                    type="submit"
                    color="primary"
                    style="width: 7vw"
                />
                <q-btn
                    label="Reset"
                    outline
                    icon="refresh"
                    type="reset"
                    color="primary"
                    class="q-ml-sm"
                    style="width: 7vw"
                />
            </div>
        </q-form>
        <q-input
            v-model="sqlStatement"
            filled
            type="textarea"
            :readonly="true"
            style="width: 62vw; margin-bottom: 2vh"
        />
        <q-btn
            label="Copy"
            icon="content_copy"
            type="submit"
            color="primary"
            @click="copy"
            style="width: 7vw"
        />
    </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue';
import {
    dataTypeKinds,
    engineKinds,
    charsetKinds,
} from '../constants/database';

// #region variables
class Field {
    name = '';
    type = ref('');
    notNullable = true;
    // incremental = false;
    comment = '';
}
const tableSchema = reactive<{
    name: string;
    ifNotExists: boolean;
    fieldsList: Field[];
    autoIncrementKey: string;
    primaryKey: string;
    engine: string;
    charset: string;
}>({
    name: '',
    ifNotExists: true,
    fieldsList: [new Field()],
    autoIncrementKey: '',
    primaryKey: '',
    engine: '',
    charset: '',
});
const sqlStatement = ref('');

// 遍历当前表的字段对象列表，提取每个字段对象的字段名，生成字符串列表，
// 将来可以传递给q-select标签的options属性，用于主键、自增键等场景下的字段选择
const fieldListOption = computed(() =>
    tableSchema.fieldsList.map((field) => field.name)
);
// #endregion

// #region functions
const addField = () => {
    tableSchema.fieldsList.push(new Field());
};

const removeField = (index: number) => {
    tableSchema.fieldsList.splice(index, 1);
};

const onSubmit = () => {
    let sqlStatementLineList: string[] = [];
    let firstLineList: string[] = ['CREATE TABLE'];
    if (tableSchema.ifNotExists === true) {
        firstLineList.push('IF NOT EXISTS');
    }
    firstLineList.push(`\`${tableSchema.name}\``);
    firstLineList.push('(');
    sqlStatementLineList.push(firstLineList.join(' '));
    tableSchema.fieldsList.forEach((field, index) => {
        let fieldLineList: string[] = [
            '\t',
            `\`${field.name}\``,
            field.type.value,
        ];
        if (field.notNullable === true) {
            fieldLineList.push('NOT NULL');
        }
        if (field.name === tableSchema.autoIncrementKey) {
            fieldLineList.push('AUTO_INCREMENT');
        }
        if (field.comment != '') {
            fieldLineList.push('COMMENT');
            fieldLineList.push(`'${field.comment}'`);
        }
        if (
            index != tableSchema.fieldsList.length - 1 || // 除了最后一个字段，每个字段声明行结尾都需要加逗号
            tableSchema.primaryKey != '' // （即使是最后一个字段）在当前表有主键时，也需要加逗号，此校验规则后续可以加一条：如果当前表有唯一约束，也需要加逗号
        ) {
            fieldLineList.push(',');
        }
        let fieldLine: string = fieldLineList.join(' ');
        sqlStatementLineList.push(fieldLine);
    });
    if (tableSchema.primaryKey != '') {
        let primaryKeyLineList: string[] = [
            '\tPRIMARY KEY',
            `(${tableSchema.primaryKey})`,
        ];
        let primaryKeyLine: string = primaryKeyLineList.join(' ');
        sqlStatementLineList.push(primaryKeyLine);
    }
    let lastLineList: string[] = [
        ')',
        `ENGINE=${tableSchema.engine.value}`,
        `DEFAULT CHARSET=${tableSchema.charset.value};`,
    ];
    let lastLine: string = lastLineList.join(' ');
    sqlStatementLineList.push(lastLine);
    sqlStatement.value = sqlStatementLineList.join('\n');
};

const onReset = () => {
    tableSchema.name = '';
    tableSchema.ifNotExists = true;
    tableSchema.fieldsList.length = 0;
    tableSchema.fieldsList.push(new Field());
    tableSchema.engine = '';
    tableSchema.charset = '';
    sqlStatement.value = '';
};

const copy = () => {
    navigator.clipboard
        .writeText(sqlStatement.value)
        .then(() => {
            console.log('Text copied to clipboard');
        })
        .catch((err) => {
            console.error('Error in copying text: ', err);
        });
};
// #endregion
</script>
