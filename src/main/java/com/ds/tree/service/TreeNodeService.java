package com.ds.tree.service;

import java.util.List;

import com.ds.tree.entity.TreeNode;
import com.ds.tree.vo.TreeNodeVO;

/**
 * The Interface TreeNodeService.
 */
public interface TreeNodeService {
	
	/**
	 * Save and updated node in the tree.
	 *
	 * @param treeNode the tree node
	 * @return the tree node
	 */
	TreeNode save(TreeNodeVO treeNode);
	
	/**
	 * Find all nodes.
	 *
	 * @return the list
	 */
	List<TreeNodeVO> findAllNodes();
	
	/**
	 * Removes the node.
	 *
	 * @param id the id
	 */
	void removeNode(Integer id);
	
	/**
	 * Removes the all.
	 */
	void removeAll();

}
