import { RecursiveAstVisitor, BindingPipe } from '@angular/compiler/src/expression_parser/ast';
import { Parser } from '@angular/compiler/src/expression_parser/parser';
import { CompileDirectiveMetadata, CompilePipeMetadata } from '@angular/compiler/src/compile_metadata';
import { HtmlParser } from '@angular/compiler/src/html_parser';
import { TemplateAst, TemplateAstVisitor } from '@angular/compiler/src/template_ast';
import { ElementSchemaRegistry } from '@angular/compiler/src/schema/element_schema_registry';
/**
 * Provides an array of {@link TemplateAstVisitor}s which will be used to transform
 * parsed templates before compilation is invoked, allowing custom expression syntax
 * and other advanced transformations.
 *
 * This is currently an internal-only feature and not meant for general use.
 */
import { TemplateParseError, TemplateParseResult } from '@angular/compiler/src/template_parser';
export declare class NodeTemplateParser {
    private _exprParser;
    private _schemaRegistry;
    private _htmlParser;
    private _console;
    transforms: TemplateAstVisitor[];
    constructor(_exprParser: Parser, _schemaRegistry: ElementSchemaRegistry, _htmlParser: HtmlParser, _console: Console, transforms: TemplateAstVisitor[]);
    parse(component: CompileDirectiveMetadata, template: string, directives: CompileDirectiveMetadata[], pipes: CompilePipeMetadata[], templateUrl: string): TemplateAst[];
    tryParse(component: CompileDirectiveMetadata, template: string, directives: CompileDirectiveMetadata[], pipes: CompilePipeMetadata[], templateUrl: string): TemplateParseResult;
    /** @internal */
    _assertNoReferenceDuplicationOnTemplate(result: any[], errors: TemplateParseError[]): void;
}
export declare function splitClasses(classAttrValue: string): string[];
export declare class PipeCollector extends RecursiveAstVisitor {
    pipes: Set<string>;
    visitPipe(ast: BindingPipe, context: any): any;
}
